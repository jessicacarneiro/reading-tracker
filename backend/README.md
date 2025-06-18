# Reading tracker

## Overview
The Reading Tracker is a tool designed to help users set and achieve their reading goals. With this application, users can:

- Add books to their reading list.
- Set deadlines for completing each book.
- Automatically calculate daily reading goals (pages per day) based on the total number of pages and the deadline.

This tracker simplifies the process of managing reading schedules, ensuring users stay on track to meet their goals.

### Configuration

### Compiler options
The file [tsconfig.json](./tsconfig.json) sets the compiler options for this project.

* `module`: Specifies the module code generation method. Node uses commonjs.
* `target`: Specifies the output language level.
* `moduleResolution`: This helps the compiler figure out what an import refers to. The value node mimics the Node module resolution mechanism.
* `outDir`: This is the location to output .js files after transpilation.

### Dependencies

#### Express
We will use Express framework to create a minimal server.

#### Lint
Run it with the following command:

```shell
npm test
```

### Folder structure

#### src/
The project will be stores inside the [src/](./src/) folder.

#### dist/
This is the location to output `.js` files after transpilation.

## Running the project
Use the following command to run the project:

```shell
npm start
```

Express will be listening at [http://localhost:3000](http://localhost:3000).

## Design

## Pre-requisites

## Setup

## Troubleshooting

## References

### Setting up the project
* [How To Set Up a Node Project With Typescript](https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript)