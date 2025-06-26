export default function SendMail() {

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const to = formData.get('to');
        const subject = formData.get('subject');
        const body = formData.get('body');
        console.log(to);
        console.log(body);
        console.log(subject);

        fetch('http://192.168.0.102:3000/send-mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ to, subject, body })
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
    }



    return (
        <div>
            <form onSubmit={handleSubmit} method="post">
                <input type="email" name="to"></input>
                <input type="text" name="subject"></input>
                <input type="text" name="body"></input>

                <button type="submit" >Send</button>
            </form>
        </div>
    )
}