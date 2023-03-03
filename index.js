const form = document.getElementById("form");      //１
const input = document.getElementById("input");    //１
const ul = document.getElementById("ul");          //１

//３ローカルストレージに保存された値を、画面リロードされたときに取ってくるための変数宣言
const todos = JSON.parse(localStorage.getItem("todos"));

//３ローカルストレージの値が空でなければ初期にliタグを追加する
if (todos){
    todos.forEach ( todo => {
        add(todo);
    })
}

form.addEventListener("submit",function(event){
    event.preventDefault();//１formをsubmit(Enter)した時のリロードを回避
    add();//１addの処理は下記（フォームをsumbitしたタイミングでliタグを追加

})

//３ローカルストレージが空でなければ引数を受け取る
function add(todo) {
    let todoText = input.value;//todoTextに入れる値
    if (todo) {//３もしローカルストレージtodoに値が入っていればそれを入れる
        todoText = todo.text;//６オブジェクトのテキストを渡す
    }
    //「.length > 0」は暗黙的型変換によって省略もできる、空文字の場合は結果falseになってif文は適用されなくなるから
    if (todoText.length > 0) {//２空の状態でsubmitした時はliタグを追加したくないから
        const li = document.createElement("li");//１documentのエレメント作成メソッド
        li.innerText = todoText;//１ユーザがフォームに入力した値を入れる
        li.classList.add("list-group-item");//１htmlのクラスにアクセスしてクラスを追加する

        if (todo && todo.completed) {
            li.classList.add("text-decoration-line-through");
        }

        //４右クリックした時の動作
        li.addEventListener("contextmenu",function(event) {
            event.preventDefault();//４右クリック時のメニュー表示を回避
            li.remove();
            saveData();       //４この内容をローカルストレージにも反映
        });

        //５左クリックした時の動作、打ち消し線を引く
        li.addEventListener("click", function () {
            li.classList.toggle("text-decoration-line-through");
            saveData();       //打ち消し線引いたことをストレージに反映
        });

        ul.appendChild(li);   //１ulタグにアクセスし、その子供としてliタグを追加する
        input.value = "";     //１最後に入力フォームを空にして使いやすく
        saveData();           //３リロードしてもローカルストレージに内容を保存できるようにする
    }
}

function saveData() {
    const lists = document.querySelectorAll("li");
    let todos = [];           //３空配列を宣言しておく

    lists.forEach(list => {   //３各liタグにアクセスする
        let todo = {          //６オブジェクトにテキストと完了状態を持たせる
            text: list.innerText,
            completed: list.classList.contains("text-decoration-line-through")
        };
        todos.push(todo);     //３宣言していた配列にliタグの値を入れていく
    });
    //３データが保存される時にJSONの形式（文字列）に変換しておくと、ローカルストレージから出し入れする時に扱いやすくなる
    localStorage.setItem("todos",JSON.stringify(todos))

}