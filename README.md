### Software Development Project o4 (_Job Portal_)

## 1. How to contribute :heart_decoration:?

- Total 5 branches :speaking_head:
  - main
  - clinet
  - client-test
  - server
  - server-test

__Step 1:__ First get the latest code from the main branch!
```
git clone https://github.com/istiakAHMEDsaad/job-portal-sdp-4.git
```
- _Which branch you need to use?_
  - If you are working on `client` use `client-test`
  - If you are working on `server` use `server-test`

__Step 2:__ Checkout that branch, use above branches (assume that we are using `client-test` branch)
```
git checkout client-test
```
__Step 3:__ :warning: Before starting any coding, always pull latest updates:
```
git pull origin client-test
```
__Step 4:__ :white_check_mark: After coding:
```
git add .
git commit -m "Updated navbar"
git push origin client-test
```
__Step 5:__ If you faced `non-fast-forward` error use rebase flag and push again using "step 4"
```
git pull origin client-test --rebase
```

__Step 6:__ :warning: After i merge the test branch to main branch please get the updated code using:
```
git checkout main
git pull origin main
```

- Optional :warning: ( Your local changes to the following files would be overwritten by merge `git fetch origin`) problem:

  - __Solve 1:__
  ```
  # don’t need their local edits
  git restore .

  # or if some files were newly added
  git reset --hard

  # last pull code
  git pull origin <branch-name>
  ```
  - __Solve 2:__
  ```
  # Save the uncommitted work
  git stash

  # Pull the latest code:
  git pull origin <branch-name>

  # Bring the saved work back:
  git stash pop
  ```
