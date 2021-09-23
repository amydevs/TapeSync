# TapeSync
A rough draft of a script that adds synchorization via Google Drive to [Aeriform Tape](https://www.aeriform.io/docs/tape) (I am in no way associated with the product btw, this is simply a mod). I'll probably add more sync folder options in the future. However in the mean time, feel free to modify the code for your own cloud synchronisation service. 

# How to Install (No Compilation Needed! The Node installer is a bit broken atm when compiled with PKG, but you can still use it through just Node.):
To install, simply move the `app` folder in the repository to `C:\Users\{your username}\AppData\Local\Programs\Tape\resources`
![image](https://user-images.githubusercontent.com/50583248/134498982-20f62778-f72a-4985-acec-fae5c0d1861e.png)

## Detailed Instructions:
1. Press `Windows Key` and `R` at the same time, and copy-paste `%appdata%\..\Local\Programs\Tape\resources` into the box, hit enter.
2. Download the `.zip` file below.
2. Double click and open it.
3. Drag the folder named `app` into the folder we opened in step 1.

## For Mac:
Unfortunately I don't have a device running MacOS, but the process should be relatively the same. Tape should be installed in your `Applications` folder, and you can copy the `app` folder into the `resources` folder once you find it.

## Compile Instructions: 
1. Install node.js
2. Clone this repository locally and `cd` to it.
3. Run `npm install` and then `node .`

If you don't wanna compile it yourself, there are prepackaged binaries you can download in [releases](https://github.com/jy1263/TapeSync/releases/)
