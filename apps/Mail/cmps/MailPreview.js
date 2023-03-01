export default {
    props: ['mail'],
    template: `
         <tr> 
            <td>{{ mail.from }}</td>
            <td>{{ mail.to }}</td>
            <td>{{ mail.body }}</td>
            <td>{{ mail.sentAt }}</td>
         </tr> 
    `,
}