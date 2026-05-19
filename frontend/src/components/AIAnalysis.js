function AIAnalysis({ aiResult }) {

    if (!aiResult) {
        return null;
    }

    return (

        <div>

            <h2>AI Analysis</h2>

            <p>
                <b>Priority:</b>
                {" "}
                {aiResult.priority}
            </p>

            <p>
                <b>Department:</b>
                {" "}
                {aiResult.department}
            </p>

            <p>
                <b>Summary:</b>
                {" "}
                {aiResult.summary}
            </p>

            <p>
                <b>Suggested Response:</b>
                {" "}
                {aiResult.response}
            </p>

        </div>

    );

}

export default AIAnalysis;