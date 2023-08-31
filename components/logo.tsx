export function LogoSvg({ className }: { className: string }) {
  return (<svg className={className}
    viewBox="0 0 200 200"
    id="svg5"
    xmlns="http://www.w3.org/2000/svg"  >
    <g fill="currentColor">
       <rect
        id="rect234"
        width="112.5"
        height="82.5"
        x="5"
        y="5"
        rx="40"
        ry="40" />
     <rect
        id="rect288"
        width="62.5"
        height="82.5"
        x="132.5"
        y="5"
        rx="40"
        ry="40" />
     <rect
        id="rect400"
        width="62.5"
        height="82.5"
        x="5"
        y="102.5"
        rx="40"
        ry="40" />
     <rect
        id="rect402"
        width="112.5"
        height="82.5"
        x="82.5"
        y="102.5"
        rx="40"
        ry="40" />
    </g>
 </svg>
 )
}

export function AbsoluteLogo() {
    return (
        <div className={`flex justify-between logo absolute top-5 right-5 w-fit h-fit py-2 px-6 rounded-3xl bg-white shadow-sm shadow-gray-400 dark:shadow-neutral-900 dark:bg-neutral-850`}>
          <LogoSvg className="h-[2.25rem] my-auto mr-2 aspect-square text-blue-600 fill-blue-600" />
          <h1 className="text-blue-600 text-4xl text-right font-extrabold">MetisPlanner</h1>
        </div>
    );
}