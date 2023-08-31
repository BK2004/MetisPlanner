export default function ProfileIcon({ className }: { className: string }) {
    return (
        <svg className={className} viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg" >
            <g stroke="currentColor" strokeWidth={15} fill="none">
                <circle r={90} cx={100} cy={100} />
                <path d="M 42 171 A 60 60 0 1 1 158 171" strokeWidth={15} />
                <path d="M 83 95 A 35 35 0 1 1 117 95" />
            </g>
        </svg>
    );
}