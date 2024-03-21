import CardCategory from "./CardCategory";

function PopulaireCategory() {
    const categorys = [{name:"name"},{name:"name"},{name:"name"},{name:"name"}]
    return (
        <div className={"my-7"}>
            <div className={"flex justify-center"}>
                <div className={"text-2xl text-green-500"}>Meilleure Category</div>
            </div>
            <div className={"grid grid-cols-4 gap-5 mt-6"}>
                {categorys.map((cat) => (
                    <div><CardCategory /></div>
                ))}
            </div>
        </div>
    );
}

export default PopulaireCategory;