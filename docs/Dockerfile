FROM ruby

# Install node.js
# Instructions: https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - \
  && apt-get install -y nodejs

RUN apt-get update && apt-get install -y zsh

RUN echo '#!/bin/bash\nbundle install && npm install && bundle exec jekyll server -H 0.0.0.0 --watch --incremental --drafts\n'\
  >> /usr/local/bin/docker-entrypoint.sh \
  && chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
