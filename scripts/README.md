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

# Deploy to GitHub pages for static hosting

```
cd squarepoet.github.io.src/

./scripts/build.sh

```

There will be lots of bugs. Fix them and run the build script again!

```

./scripts/build.sh

```

Yay, zero bugs!

The deploy script assumes you have a folder named `squarepoet.github.io.www/` that is at the same level as `squarepoet.github.io.src/`

```

./scripts/deploy_to_github.sh

cd ../squarepoet.github.io.www

git checkout next-js-src

git pull

git checkout master

git pull

```

Finally, add, commit, push! It will show up on https://squarepoet.github.io/

# Deploy to GitLab pages for static hosting

The process is similar to deploying to GitHub pages.

# Deploy to Surge for static hosting

TODO
