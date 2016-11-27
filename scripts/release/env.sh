#!/bin/sh

# Git properties
GIT_USER_NAME=patternfly-build
GIT_USER_EMAIL=patternfly-build@redhat.com

# Repo slugs
PFO_REPO_SLUG=patternfly/patternfly-org
PTNFLY_REPO_SLUG=patternfly/angular-patternfly

# Email used to notify users release is available
NOTIFY_EMAIL=patternfly-angular@redhat.com

# Prefix used to tag version bump (e.g., _bump-v3.15.0)
BUMP_TAG_PREFIX=_bump-v
BUMP_TAG_PREFIX_COUNT=`echo $BUMP_TAG_PREFIX | wc -c`

# Prefix used to tag release (e.g., v3.15.0)
RELEASE_TAG_PREFIX=v

# Bower packages not tagged in main repo (for testing with fork)
#PTNFLY_PKG_REPO=git+https://github.com/<user>/patternfly.git#v

# Skip npm publish (for testing with fork)
#SKIP_NPM_PUBLISH=1
