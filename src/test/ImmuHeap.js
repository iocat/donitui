import ImmuHeap from '../reducers/goal-tracking/ImmuHeap';

export function testImmuHeap(){
    let hb: ImmuHeap<number> = new ImmuHeap((a:number,b:number)=>a<b);
    let h: number[] = [];
    h = hb.push(h, 100);
    h = hb.push(h, 90);
    h = hb.push(h, 80);
    h = hb.push(h, 70);
    h = hb.push(h, 60);
    h = hb.push(h, 50);
    h = hb.push(h, 40);
    h = hb.push(h, 30);
    h = hb.push(h, 20);
    h = hb.push(h, 10);
    console.log(h);
    for (let r: number of h){
        let res = hb.pop(h);
        h = res.heap;
        console.log(res.item);
    }
}

testImmuHeap();
