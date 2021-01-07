// Test Material UI
// TODO

export default () => {
    const onClickButton1 = () => {
        console.log("Button 1 Clicked");
    };
    const onClickButton2 = () => {
        console.log("Button 2 Clicked");
    };

    return (
        <>
            <Button primary onClick={onClickButton1}>
                Primary
            </Button>
            <Button secondary onClick={onClickButton2}>
                Secondary
            </Button>
            <br />
            <br />
            <Input list="languages" placeholder="Sharps..." />
            <datalist id="languages">
                <option label="A major" value="FCG" />
                <option label="C major" value="No Sharps" />
                <option label="G major" value="F" />
            </datalist>
            <br />
            <br />
            <Loader active inline className="slow red" />
            <Loader active inline className="fast green" />
        </>
    );
};
