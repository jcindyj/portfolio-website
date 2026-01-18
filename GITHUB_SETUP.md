# Connecting Your Portfolio Website to GitHub

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: `portfolio-website` (or your preferred name)
   - **Description**: "My UX/UI Designer Portfolio Website"
   - **Visibility**: Choose Public or Private
   - **DO NOT** check "Add a README file" (we already have files)
   - **DO NOT** add .gitignore or license
5. Click **"Create repository"**

## Step 2: Connect Your Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

### Option A: Using HTTPS (Recommended for beginners)
```bash
cd /Users/cindyjung/portfolio-website
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

### Option B: Using SSH (If you have SSH keys set up)
```bash
cd /Users/cindyjung/portfolio-website
git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your GitHub username and `REPO_NAME` with your repository name.**

## Step 3: Push Your Code

Once you've added the remote, push your code:
```bash
git push -u origin main
```

## Optional: Set Git User Info (If needed)

If you want to configure your git user name and email:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Future Updates

After making changes to your code, use these commands:
```bash
git add .
git commit -m "Description of changes"
git push
```
