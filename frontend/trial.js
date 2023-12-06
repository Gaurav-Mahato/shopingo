// intersection of arrays
const arr = [[1,2,3],[2,3,4]]
// console.log(arr)
const intersection = (...arr) => {
    const s = new Set()
    const n = arr.length;
    let temp_length = arr[0].length
    for(let j=0;j<temp_length;j++){
        s.add(arr[0][j])
    }
    // all element of 1
    for(let i=1;i<n;i++){
        let l = arr[i].length
        let temp = new Set()
        for(let j=0;j<l;j++){
            if(s.has(arr[i][j])){
                temp.add(arr[i][j])
            }
        }
        // temp contains common element
        s=temp;
        // s - 1 U 2 
    }
    // Iterate through set 
    for(const val of s){
        console.log(val)
    }
}

intersection()