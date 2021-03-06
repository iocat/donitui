// @flow
const left = (i: number): number => (2 * i + 1);
const right = (i: number): number => (2 * i + 2);
const parent = (i: number): number => Math.floor((i - 1) / 2);

export default class ImmuHeap < T > {
    lessThan: (a: T, b: T) => boolean;
    constructor(lessThan: (a: T, b: T) => boolean) {
        this.lessThan = lessThan;
    }

    init(heap: T[]): T[]{
        let nh: T[] = heap.slice();
        for (let i: number = 0; i <= Math.floor(heap.length/2); i ++ ){
            this.trippleDown(nh, i);
        }
        return nh;
    }

    // impure function that modify the heap starting from i
    trippleDown(nh: T[], i: number){
        while (true) {
            let l: number = left(i),
                r: number = right(i),
                smallest: number = i; // the smallest of the 3 numbers, left right parent
            if (l <= nh.length - 1 && this.lessThan(nh[l], nh[smallest])) {
                smallest = l;
            }
            if (r <= nh.length - 1 && this.lessThan(nh[r], nh[smallest])) {
                smallest = r;
            }
            if (smallest === i){
                break;
            }
            let temp: T = nh[smallest];
            nh[smallest] = nh[i];
            nh[i] = temp;
            i = smallest;
        }
    }
    peek(heap: T[]):T{
        if (heap.length === 0) {
            console.error("The heap is empty: cannot peek");
        }
        return heap[0];
    }
    pop(heap: T[]): {
        heap: T[],
        item: T
    } {
        if (heap.length === 0) {
            console.error("The heap is empty: cannot pop.");
        }
        let fst: T = heap[0],
            nh: T[] = heap.slice(),
            last: T = nh.pop(); // move the last to the head
        if (nh.length === 0){
            return {
                heap: nh,
                item: fst,
            }
        }
        nh[0] = last;
        this.trippleDown(nh, 0);
        return {
            heap: nh,
            item: fst,
        };
    }

    pushMany(heap: T[], items: T[]): T[]{
        let nh: T[] = heap.slice();
        for (let item of items){
            nh.push(item);
            let i: number = nh.length - 1;
            while (parent(i) >= 0) {
                if (this.lessThan(nh[i], nh[parent(i)])) {
                    let temp: T = nh[i];
                    nh[i] = nh[parent(i)];
                    nh[parent(i)] = temp;
                    i = parent(i);
                } else {
                    break;
                }
            }
        }
        return nh;
    }

    push(heap: T[], item: T): T[] {
        let nh: T[] = heap.slice();
        nh.push(item);
        let i: number = nh.length - 1;
        while (parent(i) >= 0) {
            if (this.lessThan(nh[i], nh[parent(i)])) {
                let temp: T = nh[i];
                nh[i] = nh[parent(i)];
                nh[parent(i)] = temp;
                i = parent(i);
            } else {
                break;
            }
        }
        return nh;
    }
}
