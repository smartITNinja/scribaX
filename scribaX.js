/**
 * scribaX v1.0
 * (c) 2018 Daniel Vukasovich
 * @license MIT
 */

'use strict' ;

const Store = (function(args) {

        if(!args.state) {
                throw new Error('Expected to receive *state*');
        }
        const local = {} ;
        for (var key in args.state) {
                if(args.state.hasOwnProperty(key)) {
                        Object.defineProperty(local,key, {
                                value: args.state[key],
                                writable: false,
                                configurable: true
                        });
                }
        }

        if(args.computed) {
                for (var compute in args.computed) {
                        Object.defineProperty(local,compute, {
                                get: args.computed[compute].code,
                                writeable: false,
                                configurable: true
                        });
                }
        }

        local.commit = function(type,payload){
                Object.defineProperty(local,type, {
                        writable: true
                });
                local[type] = payload ;
                Object.defineProperty(local,type, {
                        writable: false
                });
                window[notifier.notifier]({state: type,value: local[type]});
        }

        const notifier = {} ;
        local.notify = function(listener) {
                Object.defineProperty(notifier,'notifier',{
                        value: listener ,
                        writable: false
                });
        }

        return local ;

});
