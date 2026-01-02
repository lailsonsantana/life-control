
export default function Input() {
    return(
        <div>
            <label htmlFor="visitors" className="block mb-2.5 text-md font-medium text-heading">Nome:</label>
            <input type="text" id="visitors" className="bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-3/4 px-3.5 py-3 shadow-xs placeholder:text-body" placeholder="" required />
        </div>
    )
}
