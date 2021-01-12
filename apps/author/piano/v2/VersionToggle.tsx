const Page = () => {
    return (
        <>
            <div className="version-div">
                <div className="version-toggle" id="toggle_v1">
                    V1
                </div>
                <div className="version-toggle" id="toggle_v2">
                    V2
                </div>
            </div>
            <style jsx>{`
                .version-div {
                    float: left;
                    margin-left: 8px;
                }

                .version-toggle {
                    float: left;
                    background-color: #eee;
                    color: #777;
                    padding: 3px 15px;
                    cursor: pointer;
                }

                .version-toggle.selected {
                    color: #333;
                    background-color: #cdedff;
                }
            `}</style>
        </>
    );
};
export default Page;
