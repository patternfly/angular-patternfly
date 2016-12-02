#!/bin/sh

# Build repo
#
build()
{
  echo "*** Building `pwd`"
  cd $PTNFLY_DIR

  grunt build
  check $? "grunt build failure"

  echo "*** Building ngDocs: `pwd`"
  grunt ngdocs:publish
  check $? "ngDocs build failure"
}

# Install build dependencies
#
build_install()
{
  echo "*** Intsalling build dependencies"
  cd $PTNFLY_DIR

  npm install
  check $? "npm install failure"

  bower install
  check $? "bower install failure"
}

# Test build
build_test()
{
  echo "*** Testing build"
  cd $PTNFLY_DIR

  node node_modules/nsp/bin/nsp --shrinkwrap npm-shrinkwrap.json check --output summary
  check $? "shrinkwrap vulnerability found" warn
}

# Check errors
#
# $1: Exit status
# $2: Error message
# $3: Show warning
check()
{
  if [ "$1" != 0 ]; then
    if [ "$3" = "warn" ]; then
      echo "*** Warning: $2"
    else
      echo "*** Error: $2"
      exit $1
    fi
  fi
}

# Setup env for use with GitHub
#
git_setup()
{
  echo "*** Setting up Git env"
  cd $PTNFLY_DIR

  git config user.name $GIT_USER_NAME
  git config user.email $GIT_USER_EMAIL
  git config --global push.default simple

  # Add upstream as a remote
  git remote rm upstream
  git remote add upstream https://$AUTH_TOKEN@github.com/$TRAVIS_REPO_SLUG.git
  check $? "git add remote failure"

  # Add Patternfly Org as a remote
  git remote rm pfo
  git remote add pfo https://$AUTH_TOKEN@github.com/$PFO_REPO_SLUG.git
  check $? "git add remote failure"

  # Reconcile detached HEAD -- name must not be ambiguous with tags
  git checkout -B $TRAVIS_BRANCH-local
  check $? "git checkout failure"

  # Fetch to test if tag exists
  git fetch --tags
  check $? "Fetch tags failure"
}
