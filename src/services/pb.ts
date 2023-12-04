import PocketBase from 'Pocketbase';
import { TypedPocketBase } from "../interfaces";

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_SERVER) as TypedPocketBase;

export default pb;