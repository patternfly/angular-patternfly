FROM ubuntu

RUN apt-get update -qq && apt-get -q -y install build-essential git-core wget libssl-dev

ENV NODE_ENV="production" \
    NODE_VERSION="0.1.0"

RUN git clone https://github.com/tj/n.git ~/.n \
    && cd ~/.n \
    && make install \
    && n ${NODE_VERSION} \
    && rm -rf ~/.n
RUN mkdir -p /app
RUN npm install -g bower && npm install bower
WORKDIR /app
RUN rm -rf ./node_modules \
    && npm install --production
RUN echo '{ "allow_root": true }' > ~/.bowerrc \
    && bower install --config.interactive=false