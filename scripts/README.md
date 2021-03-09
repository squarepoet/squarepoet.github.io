# Useful git commands for managing this repository.

```
git remote add origin git@gitlab.com:sqpt/squarepoet.github.io.git
git push --set-upstream origin master:next-js-src
git push origin next-js-src:next-js-src
```

```
git remote add hub git@github.com:squarepoet/squarepoet.github.io.git
git push --set-upstream hub next-js-src:next-js-src
git push hub next-js-src:next-js-src
```

```
git remote add bucket git@bitbucket.org:squarepoet/squarepoet.github.io.git
git push --set-upstream bucket next-js-src:next-js-src
git push bucket next-js-src:next-js-src
```

# Deploy to GitHub

cd to squarepoet.github.io.src

./scripts/build.sh

There will be lots of bugs. Fix them!

./scripts/build.sh

Yay, zero bugs!

github_deploy.sh

cd ../\*www

git pull

git branch

git checkout next-js-src

git pull

git checkout master

git pull

Now, add and commit and push!
