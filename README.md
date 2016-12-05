# less-plugin-resolve-blocks

Simple file management plugin to resolve blocks inside less-files.

Consider having two files:

```less
// blocks/b-main/b-main.less:
@nice-blue: #5B83AD;


// blocks/b-text/b-text.less:
@import "block:b-main";

p {
	color: @nice-blue;
}
```

When plugin finds import pattern like `block:something` it starts going up the tree trying to find folder `something` on each level above.

Once the folder is found and there's `something.less` inside it, `@import` will be resolved into it.


## Installation

```
$ npm install -g less-plugin-resolve-blocks
```

## Usage

```
$ lessc file.less --plugin=less-plugin-resolve-blocks
```
