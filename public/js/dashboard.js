const packBtnHandler = async (event) => {
    console.log('this button works');
    const id = document.getElementById('pack-list').getAttribute('data-id');
    console.log(id);
}

document.querySelector('#pack-list').addEventListener('click', packBtnHandler);