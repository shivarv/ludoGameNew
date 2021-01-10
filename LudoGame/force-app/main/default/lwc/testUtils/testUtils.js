const testMethod1 = () => {
    alert('in testmethod util1');
    testMethod2();
}

const testMethod2 = () => {
    alert('in testmethod util2');

}

export {
    testMethod1
}