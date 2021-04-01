# Useful git commands for managing this repository.

The project name is `squarepoet.github.io` because we originally hosted it on GitHub pages. But now we mirror it to other source hosting services. :-)

View the remote repositories.

```
git remote -v

    bucket	git@bitbucket.org:squarepoet/squarepoet.github.io.git (fetch)
    bucket	git@bitbucket.org:squarepoet/squarepoet.github.io.git (push)
    hub	    git@github.com:squarepoet/squarepoet.github.io.git (fetch)
    hub	    git@github.com:squarepoet/squarepoet.github.io.git (push)
    lab	    git@gitlab.com:sqpt/squarepoet.github.io.git (fetch)
    lab	    git@gitlab.com:sqpt/squarepoet.github.io.git (push)
```

GitLab

```
git remote add lab git@gitlab.com:sqpt/squarepoet.github.io.git
git push --set-upstream lab next-js-src:next-js-src
git push lab next-js-src:next-js-src
```

GitHub

```
git remote add hub git@github.com:squarepoet/squarepoet.github.io.git
git push --set-upstream hub next-js-src:next-js-src
git push hub next-js-src:next-js-src
```

Bitbucket

```
git remote add bucket git@bitbucket.org:squarepoet/squarepoet.github.io.git
git push --set-upstream bucket next-js-src:next-js-src
git push bucket next-js-src:next-js-src
```

# Build & Deploy

Run the build script from the project root.

```
cd squarepoet.github.io.src/

./scripts/build.sh

```

There will be lots of bugs. Fix them and run the build script again! Do this over and over until you reach **zero bugs**. The rendered static site will be output to `www/`. We can then deploy this directory to GitHub, GitLab, Surge, or any other place that hosts static sites.

## Deploy to GitHub pages

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

## Deploy to GitLab pages

The process is similar to deploying to GitHub pages. Run the deploy script from the project root. The script assumes you have a folder named `squarepoet.gitlab.io/` that is at the same level as `squarepoet.github.io.src/`

```
./scripts/deploy_to_gitlab.sh

cd ../squarepoet.gitlab.io/

git add .

git commit

git push
```

## Deploy to Surge

Run the surge deploy script from the project root. This is actually the fastest way to test!

```
./scripts/deploy_to_surge.sh
```

Access the site at https://music-authoring-tools.surge.sh/
