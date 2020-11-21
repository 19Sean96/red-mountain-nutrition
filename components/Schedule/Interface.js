import StepCounter from './StepCounter'
export default function ScheduleInterface({ children, watchCustInputs, validated }) {

    return (
        <section className="schedule--interface">
            {children}
            <StepCounter watchCustInputs={watchCustInputs} validated={validated}/>
        </section>
    )
}