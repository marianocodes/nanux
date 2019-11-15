#  Nanux
An experimental library to do Redux in a Angular Project with Ivy.

## Motivation
There are great solutions including vanilla Redux implementations but most of them end in a very verbose code. 

## Inspiration 
- Redux pattern
- NgRx
- NGX
- Easy Peasy
- Mobx

## How to Contribute?
TBD - Versioning, Commit messages, Testing

## Code of Conduct
TBD

##  Roadmap
> This document pretends to show what work is in progress and future plans to improve the library. Feel free to create a issue and explain what features would like to exist

### @nanux/store
**Alpha**
- [x] Basic service to handle store  
- [x] Ivy support by using Experimental HOCs
- [x] Auto-generation of selectors
- [x] Redux DevTools support
- [ ] First release to NPM registry
- [ ] Basic documentation
- [ ] Evergreen Browser support
- [ ] 80% Unit testing coverage
- [ ] Improve action typing

**Beta**
- [ ] Memoization of data 
- [ ] Implementation of pattern to handle sideffects
- [ ] Create or separate classes in charge of the busineess logic into a different lib to 

**V1**
- [ ] CI/CD support to run unit tests and E2E
- [ ] Persistent data - Rehydrid data from storage or HTTP service  

**V1-Next**
- [ ] Better type support 
- [ ] Lazy loading of states 
- [ ] Normalization state proposal
- [ ] Schematics to implement the library faster
- [ ] Custom pipes to resolve state in the HTML

### Rules
1. Add properties to class with the same declared in the state and adding `$`
2. If select more than one state, make sure not to repeat propery name otherwise it will overwritten
3. No optional properties allow in the first level of the state, all properties must be declare and have a default value
