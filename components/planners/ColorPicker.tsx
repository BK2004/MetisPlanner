import { Colors } from ".";

export function ColorPicker({ selected, setColor }: { selected: string, setColor: any }) {
    return <div className="color-display overflow-hidden w-full text-lg flex flex-wrap justify-start gap-[5px]">
        {/* LOAD ALL ALLOWED COLORS */}
        {Object.keys(Colors).filter((val) => !isNaN(Number(val))).map((color) => {
            return <button onClick={() => { setColor(Colors[Number(color)]) }} key={color} className={`w-[calc(20%-4px)] text-white text-3xl font-bold aspect-square rounded-md border-2 transition-all duration-100 ease-in-out border-white dark:border-neutral-850 bg-${Colors[Number(color)]}-500 hover:border-0`}>
                {selected === Colors[Number(color)] ? "✓" : ""}
            </button>;
        })}
    </div>
}