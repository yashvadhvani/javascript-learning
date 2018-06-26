let budgetController = (function () {
    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    Expense.prototype.calcPerc = function (totalIncome) {

        if (totalIncome > 0)
            this.percentage = Math.round((this.value / totalIncome) * 100);
        else
            this.percentage = -1;
    }

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    }

    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    let calculateTotal = (type) => {
        let sum = 0;
        data.allItems[type].map((obj) => {
            sum += obj.value;
        });
        data.totals[type] = sum;
    }

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };
    return {
        addItem: (type, des, val) => {
            let newItem, ID;
            //create new ID
            if (data.allItems[type].length > 0)
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            else
                ID = 0;
        
              // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }//push it into the data structure
            data.allItems[type].push(newItem);

            //return the new element
            return newItem;
        },
        deleteItem: (type, id) => {
            let ids = data.allItems[type].map((obj) => {
                return obj.id;
            });
            let index = ids.indexOf(parseInt(id));
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },
        calculateBudget: () => {
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            // calculate the budget : income -expense
            data.budget = data.totals.inc - data.totals.exp;
            //calculate the percentages of income that we spent
            if (data.totals.inc > 0)
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            else
                data.percentage = -1;
        },
        calculatePercentage: () => {
            data.allItems.exp.forEach((current) => {
                current.calcPerc(data.totals.inc);
            });
        },
        getPercentages: () => {
            let allPerc = data.allItems.exp.map((cur) => {
                // console.log(cur.getPercentage());
                return cur.getPercentage();
            });
            return allPerc;
        },
        getBudget: () => {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },
        testing: () => {
            console.log(data)
        }
    }
}());

let UIController = (function () {
    let DOMstrings = {
        inputType: '.add__type',
        input_desr: '.add__description',
        input_val: '.add__value',
        input_btn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLable: '.budget__expenses--percentage',
        container: '.container',
        expensePercentage: '.item__percentage',
        dateLabel: '.budget__title--month'
    }
    let formatNumber = (num, type) => {
        num = Math.abs(num).toFixed(2);
        let numSplit = num.split(".");
        let int = numSplit[0];
        console.log(int);
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length);
        }
        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + numSplit[1];
    };
    let nodeListForEach = (list, callback) => {
        for (let i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };
    return {
        getInput: () => {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.input_desr).value,
                value: parseFloat(document.querySelector(DOMstrings.input_val).value)
            };
        },
        addListItem: (obj, type) => {
            //Create HTML string with Placeholder Text
            let html, element;
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%">' +
                    '<div class="item__description">%description%</div>' +
                    '<div class="right clearfix">' +
                    '<div class="item__value"> %value% </div>' +
                    '<div class="item__delete">' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            } else {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%">' +
                    '<div class="item__description">%description%</div>' +
                    '<div class="right clearfix">' +
                    '<div class="item__value"> %value% </div>' +
                    '<div class="item__percentage">21%</div>' +
                    '<div class="item__delete">' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
            }
            //Replace the placeholder text with some actual data
            let newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            let d = document.createElement('div');
            d.innerHTML = newHtml;
            document.querySelector(element).insertAdjacentElement('beforeend', d.firstChild);
            //Insert the HTML into the DOM
        },
        deleteListItems: (selectorID) => {
            let elm = document.getElementById(selectorID);
            elm.parentElement.removeChild(elm);
        },
        clearFields: () => {
            let fields = document.querySelectorAll(DOMstrings.input_desr + ',' + DOMstrings.input_val);
            //convert list to an array
            let fieldsArray = Array.prototype.slice.call(fields);
            //for each
            /*
                fieldsArray.forEach(function(current,index,array){
                current.value = ""; 
            });
             */

            fieldsArray.map((obj) => {
                obj.value = "";
            });
            fieldsArray[0].focus();

        },
        displayBudget: (obj) => {
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, obj.budget > 0 ? 'inc' : 'exp');
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');
            if (obj.percentage > 0)
                document.querySelector(DOMstrings.percentageLable).textContent = obj.percentage + '%';
            else
                document.querySelector(DOMstrings.percentageLable).textContent = '--';
        },
        displayPercentages: (percentages) => {
            let fields = document.querySelectorAll(DOMstrings.expensePercentage);
            console.log(fields);
            
            nodeListForEach(fields, function (current, index) {
                if (percentages[index] > 0)
                    current.textContent = percentages[index] + '%';
                else
                    current.textContent = '--';
            });
        },
        displayMonth: () => {
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            document.querySelector(DOMstrings.dateLabel).textContent = monthNames[new Date().getMonth()] + ' ' + new Date().getFullYear();

        },
        changedType: () => {
            let fields =document.querySelectorAll(DOMstrings.inputType+","+DOMstrings.input_desr+","+DOMstrings.input_val);
            console.log(fields);
            nodeListForEach(fields,function(cur){
                cur.classList.toggle('red-focus');
            });
            document.querySelector(DOMstrings.input_btn).classList.toggle('red');
        },
        getDOMstrings: () => {
            return DOMstrings;
        }

    }
}());

let AppController = (function (budgetController, UIController) {

    let setupEventListners = () => {
        let DOM = UIController.getDOMstrings();
        document.querySelector(DOM.input_btn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13 || e.which === 13)
                ctrlAddItem();
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change',UIController.changedType);
    }

    let updateBudget = () => {
        //1. calculate the Budget
        budgetController.calculateBudget();
        //2. return the Budget
        let budget = budgetController.getBudget();

        //3. Display Budget to UI
        UIController.displayBudget(budget);
    }

    let updatePercentages = function () {
        // 1. Calculate Percentages
        budgetController.calculatePercentage();
        // 2. Read Percentages from the budget controller
        let percentages = budgetController.getPercentages();
        // 3. Update percentages to UI
        UIController.displayPercentages(percentages);

    }

    let ctrlAddItem = () => {
        //1. get The Input Data
        let input = UIController.getInput();
        //2. Add Item to budget Controller
        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
            let newItem = budgetController.addItem(input.type, input.description, input.value);
            //3. Add Item to the UI
            UIController.addListItem(newItem, input.type)
            //4. Clear The Fields
            UIController.clearFields();
            //5. Calculate and update the budget
            updateBudget();
            //6. Calculate and update percentages
            updatePercentages();
        }
    };

    let ctrlDeleteItem = (e) => {
        let itemId = e.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemId) {
            let splitID = itemId.split('-');
            let type = splitID[0];
            let ID = splitID[1];
            //1. Delete the item from data structure
            budgetController.deleteItem(type, ID);
            //2. Delete the item from the UI
            UIController.deleteListItems(itemId);
            //3. Update and show the new budget
            updateBudget();
            //4. Calculate and update percentages
            updatePercentages();
        }
    };
    return {
        init: () => {
            console.log('Application Started');
            UIController.displayMonth();
            UIController.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1,
            });
            setupEventListners();
        },
    };

}(budgetController, UIController));

AppController.init();