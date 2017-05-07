# eguitarz-github-com

## Deploy
- git checkout master && rm -rf `ls -a | grep -vE '\.gitignore|\.git|node_modules|bower_components|(^[.]{1,2}/?$)'` && git add -A && git commit -m "initialises gh-pages(in case of organisation master) commit"
- Switch back to ember branch: git checkout ember
- Build the site using ember-cli-github-pages: ember github-pages:commit --branch master --message "Deploy"
- Push the master branch: git push -u origin master.