CURRENT_SET = new Set();

(function init() {
    updateSpeed();
    updateElements();
    showDetails();
})();

// Add bind events on UI elements


$("#elements").on("input", function() {
    updateElements();
});

$("#algorithms").on("change", function() {
    showDetails();
});

$("#sort").on("click", function() {
    reset();
    runAlgo();
    document.getElementById("array-input").value = "";
}); 

$("#stop").on("click", function() {
    stopAnimation();
});

$("#reset").on("click", function() {
    reset();
    document.getElementById("swap").innerHTML = 0;
    document.getElementById("compare").innerHTML = 0;
});

function updateSpeed() {
    SPEED = 100;
}

function updateElements() {
    clearContainer();
    TOTAL_ELEMENTS = 5; //Total elements
    // document.getElementById("element-count").innerHTML = TOTAL_ELEMENTS;  // Update total elements in slider
    CURRENT_SET = Genetate_Bars();
    insertBars(CURRENT_SET);
}
function Genetate_Bars() {
    let set = new Set();  
    let input = document.getElementById("array-input");
    let arr = input.value;
    let a= arr.split(" ");
    TOTAL_ELEMENTS = a.length;
    console.log(arr);
    console.log(a);
    let i =0;
    while (i < TOTAL_ELEMENTS) {
        set.add(a[i]);  // rANDOM NUMBER GENETATOR
        i++;
        // set.add(Math.round(Math.random() * 99) + 1);  // rANDOM NUMBER GENETATOR
    }

    return set;
}


function clearContainer() {
    container.innerHTML = "";
}

function insertBars(set) {
    const width = CONTAINER_WIDTH / TOTAL_ELEMENTS;

    // Generate bars
    const arr = Array.from(set);
    for (let i = 0; i < arr.length; ++i) {
        let bar = document.createElement("div");
        bar.setAttribute("class", "bar");
        bar.setAttribute("style", "width: " + width + "px; height: " + arr[i] + "%;");
        bar.innerHTML = arr[i];
        container.appendChild(bar);
    }
}

function showDetails() {
    const algo = $("select#algorithms")
        .children("option:selected")
        .val();
    $(".algo-container").addClass("hidden");
    $("#" + algo + "-info").removeClass("hidden");
}

function disableInput(what = true) {
    $(".sort").attr("disabled", what);
    $(".slider-input").attr("disabled", what);
    $("select#algorithms").attr("disabled", what);
    $("select#order").attr("disabled", what);

    // Swap colors
    $("#stop")
        .attr("disabled", true)
        .removeClass("green");

    if (what) {
        $(".sort").removeClass("green");
        $("#stop")
            .attr("disabled", false)
            .addClass("green");

        return;
    }

    $(".sort").addClass("green");
}

function reset() {
    stopAnimation();
    updateSpeed();
    updateElements();
}

function runAlgo() {
    if (SPEED <= 0) {
        console.log("Abnormal delay.");
        return;
    }

    const algo = $("select#algorithms")
        .children("option:selected")
        .val();

    const order = $("select#order")
        .children("option:selected")
        .val();

    let elements = JSON.parse(JSON.stringify(getElements()));
    const solution = solve(algo, order, elements);

    if (solution) {
        disableInput();
        animate(solution);
    }

    function getElements() {
        let els = Array();

        for (let i = 0; i < bars.length; ++i) {
            els.push(parseInt(bars[i].innerHTML));
        }

        return els;
    }

    function solve(algo, order, input) {
        switch (algo) {
            case "bubble": {
                return Algorithms.bubble(input, order);
            }
            case "heap": {
                return Algorithms.heap(input, order);
            }
            case "insertion": {
                return Algorithms.insertion(input, order);
            }
            case "selection": {
                return Algorithms.selection(input, order);
            }
            case "shell": {
                return Algorithms.shell(input, order);
            }
            default: {
                return false;
            }
        }
    }
}
