
### Scaffolding Titanium TypeScript

This repository contains a template project to create iOS/Android apps using
[Appcelerator Titanium SDK](http://www.appcelerator.com/) and
[TypeScript](http://www.typescriptlang.org/). The build process is handled by
[Grunt.js](http://gruntjs.com/) under [node.js](http://nodejs.org/).
Additionally, this template includes [underscore.js](http://underscorejs.org/)
as an example of how to link third party libraries.


#### Bootstrapping

Make sure you have installed [node.js](http://nodejs.org/) (*0.8.9*),
[Titanium Studio](http://www.appcelerator.com/platform/titanium-studio/) with
**Titanium** **SDK** (*2.1.3*) and [npm](https://npmjs.org/) (node installer
should install npm automatically).

Navigate to this template directory and run these commands to install all
dependencies and build the project:

```
npm install
grunt
```

After the build is done, import the directory as a project in *Titanium*
*Studio* and run the project to launch the app in your iOS/Android device.


#### Configuration and customization

Before you start coding your app (the sources are in `/App` directory), you have
to customize your project settings in `package.json`. You can configure more
options modifying `/Config` files.

The build process can be customized modifying `grunt.js` file. For more
information visit [Grunt.js](http://gruntjs.com/).


#### Building

##### `grunt`, `grunt debug` and `grunt default`

Build the project without any optimizations. The source code and configuration
files can include preprocess directives (like `@@version` or `@@name`) that will
be replaced in a build phase.


##### `grunt release`

Build the project with all optimization enabled. The source optimization
includes minification, dead code elimination, mangle names and elimination of
`console.*` statments.

This build cofiguration also performs a loss-less image optimization. Make sure
you have the [required tools](https://npmjs.org/package/grunt-imagine) to
execute this phase.


##### `grunt release-nio`

Build the project with source code optimization enabled (without image
optimization).


##### `grunt watch`

Watch for changes in source code files (`/App/*` files) and resoruces
(`/Assets/*` files) and performs a rebuild.


##### `grunt clean`

Clean generated files.


##### `grunt bump`, `grunt bump:minor` and `grunt bump:major`

Bump project version (path, minor verison or major verion). Using
[Semantic Versioning](http://semver.org/).


#### License

This project template is under **Public** **domain**.
