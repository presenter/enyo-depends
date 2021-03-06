#enyo-depends

A better way to handle dependencies in Enyo.

##Installing

You should install enyo-depends using node package manager (npm).

	npm install -g enyo-depends

Alternatively, you may also clone the repository and install the local copy.

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

###Updaing Libraries

You can update all of your installed libraries by calling `update` from the command line. This will download the latest versions of all dependencies listed in your enyo.json file.

	enyo-depends update

###Uninstalling A Library

You can uninstall a library using the following command, where name is the same as the repo name (or the alias) used while installing.

	enyo-depends uninstall name

The uninstall command will also remove all of the libraries included by the library unless the library is included in your application's enyo.json file. Note that currently this command could inadvertantly uninstall libraries that other installs brought in.

###Creating enyo.json

You can have enyo-depends auto-generate an enyo.json file for you project. This will auto-detect the version of Enyo that you are using, and create a boilerplate enyo.json file.

	enyo-depends init

If you install packages without first creating an enyo.json file, then one will be automatically generated during the install process.

##enyo.json

One of the key ways that enyo-depends works is through an enyo.json file that is included in your application. Other developers may also leverage this file to make their libraries more compatible with enyo-depends. When installing a library, if enyo-depends detects an enyo.json file, it will automatically include the library in your main package.js file.

You can also customize enyo.json to better fit your project, as by default enyo-depends assumes a file structure similar to bootplate.

Below is an example of an application/library's enyo.json file.

``` js
{
	"name": "my-app",
	"description": "An Enyo application using enyo-depends.",
	"version": "1.0.0",
	"package": "source/package.js",
	"lib": "lib/",
	"enyo": "enyo/"
	"dependencies": {
		"enyo-editor": "presenter/enyo-editor@master"
	},
	"engines": {
		"enyo": ">=2.1.0"
	}
}
```

- __"name"__ is the name of the application. This should be the same as your github repository's name. If you set a name different from your repo's name, then when installing the library it will install as that name.
- __"description"__ is a simple description of your application or library.
- __"version"__ is the version of your application or library. When running enyo-depends update, it will check this version to determine if an update is needed.
- __"package"__ is the location of your application's main package.js file. In bootplate, the main file is `source/package.js`. 
- __"lib"__ is the folder that you wish to install libraries to. By default, the folder is `lib/`. Please note that if you set this in your enyo.json file that installing a library will not auto-include it in your package.js file.
- __"enyo"__ is the folder that holds the copy of Enyo used in your application. This defaults to `enyo/`, and can also be set using the --enyo flag when installing libraries.
- __"dependencies"__ is an object that contains your application or library's dependencies. When installing a library with `enyo-depends install`, it will automatically add the dependency to the object. Each dependency is a key-value pair, where the key is the name of the library and the value is the partial path to the github repo. The key can also be used to create an alias, as the library will be installed under a folder with that name.
- __"engines"__ is an object that should include a key named `enyo`. The value is the version of Enyo that is required for your library or application. This will be checked against the local version of enyo when installing. Any semantic versioning string will work.

##Options

###--alias
If you wish to install a given library under a different name, you can use create an alias, which will simply install the library under a differently named folder. It will also use the same alias when adding the dependency to your enyo.json file.

	enyo-depends install presenter/enyo-editor --alias presenter

###--enyo
If you do not have the core Enyo files in a folder named "enyo", then you can specify the location of enyo using this option. You may also specify the location of enyo in your enyo.json file.

	enyo-depends install presenter/enyo-editor --enyo scripts/enyo

###--noenyo
For all commands, enyo-depends ensures that the directory has enyo installed. You can override this behavior by using the --noenyo option.

	enyo-depends install presenter/enyo-editor --noenyo

###--nodepends
By default, installing a package adds it to your enyo.json file and includes it in your app's package.js file. Using this flag disables that behavior.

	enyo-depends install presenter/enyo-editor --nodepends

##Notes

Please note that enyo-depends currently only supports libraries that are hosted on GitHub.