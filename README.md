#enyo-depends

A better way to handle dependencies in Enyo.

##Installing

Until enyo-depends is on npm, you can install it the following way:

	git clone git://github.com/presenter/enyo-depends.git
	cd enyo-depends
	npm install -g

You may need to run npm install with sudo.

##Using

You can install EnyoJS libraries with enyo-depends very easily using the command line.

###Installing A Library

First cd into the directory of your enyo application. You can then install a package using the following command, where "username/repo@branch" are the same as the GitHub repository containing the library. If you do not define a branch, then the master branch will be used.

	enyo-depends install username/repo@branch

If the installer detects an enyo.json file in the library, then it will also install the libraries dependencies, and include all installed libraries in your app's package.js file.

###Options

####--enyo
If you do not have the core Enyo files in a folder named "enyo", then you can specify the location of enyo using this option.

	enyo-depends install presenter/enyo-editor --enyo scripts/enyo

####--noenyo
For all commands, enyo-depends ensures that the directory has enyo installed. You can override this behavior by using the --noenyo option.

	enyo-depends install presenter/enyo-editor --noenyo

####--nodepends
By default, installing a package adds it to your enyo.json file and includes it in your app's package.js file. Using this flag disables that behavior.

	enyo-depends install presenter/enyo-editor --nodepends

##Notes

Please note that enyo-depends currently only supports libraries that are hosted on GitHub.

The cli assumes that your application has a source folder with a package.js in it. You can override the location of the main package.js in the enyo.json file in your application.