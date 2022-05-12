import { Record, List, fromJS } from "immutable";

const classMap = {};

const camelize = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
};
const generateGetterName = (name) => {
    return camelize("get " + name);
};
const generateSetterName = (name) => {
    return camelize("set " + name);
};

class ImmutableModel {
    static createClass(name, config = {}) {
        if (!config.schema) {
            config = {
                schema: config,
            };
        }
        classMap[name] = class extends Record(config.schema, name) {
            constructor(state) {
                for (let k in state) {
                    if (
                        config.schema[k] instanceof Record &&
                        !(state[k] instanceof Record)
                    ) {
                        state[k] = new config.schema[k].constructor(state[k]);
                    }
                }
                super(state);
                for (let k in config.schema) {
                    const getterName = generateGetterName(k);
                    const setterName = generateSetterName(k);
                    const getter = (self, k) => () => {
                        const result = self.get(k);
                        return result;
                    };
                    const setter = (self, k) => (v) => {
                        const result = self.set(k, v);
                        for (let k in config.schema) {
                            const getterName = generateGetterName(k);
                            const setterName = generateSetterName(k);
                            result[getterName] = getter(result, k).bind(result);
                            result[setterName] = setter(result, k).bind(result);
                        }
                        return result;
                    };
                    this[getterName] = getter(this, k).bind(this);
                    this[setterName] = setter(this, k).bind(this);
                }
            }
            static parse(state) {
                if (typeof state === "string") {
                    try {
                        state = JSON.parse(state);
                    } catch (e) {
                        console.error(e);
                        throw e;
                    }
                }
                return new this(fromJS(state));
            }
            static parseList(states) {
                if (typeof states === "string") {
                    try {
                        states = JSON.parse(states);
                    } catch (e) {
                        console.error(e);
                        throw e;
                    }
                }
                return List(states.map((state) => new this(fromJS(state))));
            }
        };
        return classMap[name];
    }
}

export default ImmutableModel;
