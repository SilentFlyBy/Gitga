export * from "./git";
export * from "./git-command";
export * from "./parameter";

export interface ITest1 {}
export interface ITest2{}
export interface ITestGeneric<T> {}

export function test() {
    let p: ITestGeneric<ITest1> = {}
    let q: ITestGeneric<ITest2> = p;
}