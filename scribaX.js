/**
 * scribaX v1.0.3
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
                if(!validator[type]) {
                        throw new Error(`state ${type} has no schema defined`);
                }
                if(typeof payload !== validator[type]) {
                        throw new Error(`state ${type} does not match its schema type`);
                }
                Object.defineProperty(local,type, {
                        writable: true
                });
                local[type] = payload ;
                Object.defineProperty(local,type, {
                        writable: false
                });
                window[notifier.notifier]({state: type,value: local[type]});
        }

        const validator = {} ;
        if(args.schema) {
                for (var name in args.schema) {
                        const valid = ['string','number','boolean','object'];
                        if(!valid.includes(args.schema[name])) {
                                throw new Error(`state ${args.schema[name]} schema type is not valid - must be: string, number, boolean or object`);
                        }
                        Object.defineProperty(validator,name, {
                                value: args.schema[name],
                                writable: false
                        });
                }
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
