#enyo-depends

A better way to handle dependencies in Enyo.

##Installing

Until enyo-depends is on npm, you can install it the following way:

	git clone git://github.com/presenter/enyo-depends.git
	cd enyo-depends
	npm install -g

You may need to run the npm install with sudo.

##Using

You can install EnyoJS libraries with enyo-depends very easily using the command line.

###Installing A Library

First cd into the directory of your enyo application. You can then install a package using the following command.

	enyo-depends install username/repo

The username and repo should be the same as the GitHub repository that the library is in. The install command will download the latest version of the library and copy it into your application's "lib" folder. It will also create a boilerplate enyo.json file and include the dependency.

###Options

####-e, --enyo
If you do not have the core Enyo files in a folder named "enyo", then you can specify the location of enyo using this option.

	enyo-depends install presenter/enyo-editor --enyo assets/enyo

####--noenyo
By default, enyo-depends locates enyo before attempting to install a library. You can override this behavior by using the --noenyo option.

	enyo-depends install presenter/enyo-editor --noenyo


##Notes

Please note that enyo-depends currently only supports libraries that are hosted on GitHub.

The cli assumes that your application has a source folder with a package.js in it. You can override the location of the main package.js in the enyo.json file in your application.