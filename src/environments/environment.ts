import { environment as base } from './environment.base';
export let environment = {
    ...base,
    ...process.env
};