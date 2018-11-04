# scribaX
A simple state repository and manager for JavaScript applications

## Why scribaX?
Because we don't need a massive amount of software to address a given request. Sometimes a little piece of code will do the trick.

## Goals
* Data Integrity - A single source of truth (SSOT)
* Predictability - All the views have access to the same data
* Enforced security - Data can only be mutated invoking a known action and not by unknown sources or actions.
* Easy of use - Subscribe to multiple or single property change in the store and customize how your application responds to data changes.

## Components & Data Flow
<p align="center">
  <img width="700px" src="https://smartit.ninja/images/scribaX/scribaX-flow-1.jpg">
</p>

The data flow is always unidirectional and all shareable data will be persisted in the store.

The only way to update data is by explicitly executing a self provided method called "commit".

Every time a "commit" action is performed, the store will notify this update *one and only* to the "notifier" function.

Within the "notifier" function, you can customize how your application "reacts" to this event.

## The Store
scribaX manages only #2 kind of data: "state" data and "computed" data.

A sample store would be something like this:

```javascript
const store = new Store({
        state: {
                cards: [],
                name: null,
                win: 0,
                isLogged: false,
                helmet: 0,
                round: 0
        },
        computed: {
                Comp1: {
                        code: function () {
                                return this.helmet + this.ronda ;
                        }
                }
        }
});
```

Plain and simple, "state" data is the one you update(mutate) by invoking the "commit" method:

```javascript
store.commit('round',4);
```

And "computed" data is derived state based on store state, by defining "getters" in the store. In the above example:

```javascript
function () {
  return this.helmet + this.round ;
}
```

## Reactions to updates

Simply connect a custom function to the self provided "notify" method, and that's it.

```javascript
store.notify('notifier');
```

You can customize your "notifier" function as you wish:

```javascript
function notifier(args) {
  const el = document.getElementById('commit');
  el.insertAdjacentHTML('beforeend',`<p>${args.state} now: ${args.value}</p>`);

  const elStore = document.getElementById('store');
  elStore.innerHTML = `round: ${store.round} win: ${store.win} helmet: ${store.helmet} myComp: ${store.Comp1}`;
}
```

## What functionalites are not present here?

* Reducers / Mutations: The goal of this project is to provide "only data" and not mixing "data" with "business logic".
* Setters: A setter would be just another "business logic" snippet.
* Actions: Again, more bussiness logic.

## Installation

``` javascript
<script src="/path.to/scribaX.js"></script>
```

## Reach me out

* [Web](https://smartit.ninja)
* [Twitter](https://twitter.com/dr_vitus_zato)
* [Facebook](https://www.facebook.com/smartITninja)

## Acknowledgements

Thanks to the incredible people who maintain projects such as [Redux](http://redux.js.org), [Vuex](http://vuex.vuejs.org) and [MobX](http://mobx.js.org) et. al. 
And thanks to all the people who share their knowledge and experiences freely on the Internet, you guys inspired this project.

## License

[MIT](http://opensource.org/licenses/MIT)
