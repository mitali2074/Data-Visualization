class Frame {
    constructor(e, h) {
        this.elements = [];
        this.highlights = [];
        this.information = "";

        if (e != undefined && e.length) {
            this.elements = e;
        }

        if (h != undefined && h.length) {
            this.highlights = h;
        }
    }

    addHighlights(highlights) {
        for (const e of highlights) {
            this.highlights.push(e);
        }
    }

    addElements(elements) {
        for (const e of elements) {
            this.elements.push(e);
        }
    }
}

class Animation {   
    constructor() {
        this.frames = [];
    }

    addFrame(frame) {
        const temp = JSON.parse(JSON.stringify(frame)); // Only store a copy
        this.frames.push(temp);
    }

    getFrames() {
        return this.frames;
    }
}

class Algorithms {
    static bubble(e, order) {
        let elements = e;
        let solution = new Animation();
        let swapped = false;
        let swap =0;
        let compare =0;

        for (let i = 0; i < elements.length; ++i) {
            swapped = false;
            for (let j = 0; j < elements.length - 1; ++j) {
                solution.addFrame(new Frame([], [j, j + 1]));
                compare++;
                document.getElementById("compare1").innerHTML = compare;
                if (order == "desc" ? elements[j] < elements[j + 1] : elements[j] > elements[j + 1]) {
                    swapped = true;
                    swap++;
                    document.getElementById("swap1").innerHTML = swap;
                    const temp = elements[j];
                    elements[j] = elements[j + 1];
                    elements[j + 1] = temp;

                    solution.addFrame(new Frame([j, j + 1], [j, j + 1]));
                    
                }
            }

            if (!swapped) {
                break;
            }
        }
        swap=0;
        return solution;
    }

    static insertion(e, order) {
        let elements = e;
        let solution = new Animation();
        let swapped = false;
        let swap =0;
        let compare =0;

        for (let i = 1; i < elements.length; ++i) {
            swapped = false;
            let key = elements[i];
            let j = i - 1;

            solution.addFrame(new Frame([], [j, j + 1]));
            compare++;
            document.getElementById("compare2").innerHTML = compare;

            while (j >= 0 && (order == "desc" ? elements[j] < key : elements[j] > key)) {
                swap++;
                document.getElementById("swap2").innerHTML = swap;
                swapped = true;
                solution.addFrame(new Frame([], [j, j + 1]));   
                elements[j + 1] = elements[j];
                solution.addFrame(new Frame([j, j + 1], [j, j + 1]));
                j = j - 1;
            }
            elements[j + 1] = key;
        }
        swap=0;

        return solution;
    }

    static selection(e, order) {
        let elements = e;
        let solution = new Animation();
        let swapped = false;
        let swap =0;
        let compare =0;

        for (let i = 0; i < elements.length - 1; ++i) {
            swapped = false;
            let current = i;

            solution.addFrame(new Frame([], [i, current]));

            let j = 0;
            for (j = i + 1; j < elements.length; ++j) {
                solution.addFrame(new Frame([], [i, j, current]));
                compare++;  
                document.getElementById("compare4").innerHTML = compare;
                if (order == "desc" ? elements[j] > elements[current] : elements[j] < elements[current]) {
                    current = j;
                    swap++;
                    document.getElementById("swap4").innerHTML = swap;
                }
            }

            const temp = elements[current];
            elements[current] = elements[i];
            elements[i] = temp;

            solution.addFrame(new Frame([i, current], [j, current]));
        }

        return solution;
    }

    static shell(e, order) {
        let elements = e;
        const n = e.length;
        let solution = new Animation();
        let swapped = false;
        let swap =0;
        let compare =0;

        for (let gap = parseInt(n / 2); gap > 0; gap = parseInt(gap / 2)) {
            for (let i = gap; i < n; ++i) {
                swapped = false;
                const temp = elements[i];
                let j;
                compare++;
                document.getElementById("compare5").innerHTML = compare;
                
                if (!isNaN(j - gap)) {
                    solution.addFrame(new Frame([], [i, j - gap]));
                }

                for (j = i; j >= gap && (order == "desc" ? elements[j - gap] < temp : elements[j - gap] > temp); j -= gap) {
                    solution.addFrame(new Frame([j, j - gap], [i, j - gap]));
                    swap++;
                    document.getElementById("swap5").innerHTML = swap;  
                    elements[j] = elements[j - gap];
                    solution.addFrame(new Frame([], [j, j - gap]));
                     
                }

                solution.addFrame(new Frame([], [j, i]));
                elements[j] = temp;
                solution.addFrame(new Frame([], [j, i]));
            }
        }

        return solution;
    }

    static heap(e, order) {
        let elements = e;
        const n = e.length;
        let solution = new Animation();
        let swapped = false;
        let swap =0;
        let compare =0;

        for (let i = parseInt(n / 2) - 1; i >= 0; --i) {
            swapped = false;
            heapify(elements, n, i, solution, order);
        }

        for (let i = n - 1; i >= 0; --i) {
            const temp = elements[0];
            elements[0] = elements[i];
            elements[i] = temp;
            
            swap++;
            document.getElementById("swap3").innerHTML = swap;
            solution.addFrame(new Frame([0, i], [0, i]));

            heapify(elements, i, 0, solution, order);
        }

        function heapify(elements, n, i, solution, order) {
            let current = i;
            let left = 2 * i + 1;
            let right = 2 * i + 2;

            if (left < n && (order == "asc" ? elements[left] > elements[current] : elements[left] < elements[current])) {
                current = left;
                
            compare++;
            document.getElementById("compare3").innerHTML = compare;
            }

            if (right < n && (order == "asc" ? elements[right] > elements[current] : elements[right] < elements[current])) {
                current = right;
                
            compare++;
            document.getElementById("compare3").innerHTML = compare;
            }

            solution.addFrame(new Frame([], [current, i]));

            if (current != i) {
                
            swap++;
            document.getElementById("swap3").innerHTML = swap;
                const temp = elements[i];
                elements[i] = elements[current];
                elements[current] = temp;
                solution.addFrame(new Frame([current, i], [current, i]));

                heapify(elements, n, current, solution, order);
            }
        }

        return solution;
    }
}
