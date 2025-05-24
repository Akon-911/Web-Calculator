document.addEventListener('DOMContentLoaded', (e) => {
    const btns = document.querySelectorAll('.btn'); // Fetching all the buttons 
    const display = document.getElementById('display'); // Fetching the display event
    const sec_display = document.getElementById('sec_display'); // The secondary display I want
    btns.forEach(btn => {
        // For loop to add the event listener for each button
        btn.addEventListener('click', () => {
            

            const dis = display.textContent;
            const con = btn.textContent;
            const sec_dis = sec_display.textContent;
            
            // If C is pressed

            if (con.toUpperCase() === 'C') {
                display.textContent = '0';
                sec_display.textContent = '0';
                return;
            }

            const signs = {
                '+':true,
                '-':true,
                '/':true,
                '*':true
            }
            // Checking if the button is the sign
            if (signs[con]) {
                // Checking the secondary display if it has any sign in the end and then change the sign OR if the user accidentally presses the decimal sign.
                if (signs[sec_dis[-1]] || dis[-1] === '.') {
                    sec_display.textContent = sec_dis.substring(0,-1) + con;
                    return
                } else {
                    if (dis === '0') {
                        if (con === '/') {
                            display.textContent = '0';
                            sec_display.textContent = '0';
                        } else {
                            sec_display.textContent += con;
                        }
                    }
                    // If 2 numbers don't have any signs in between OR if the sec display is not 0
                    else sec_display.textContent = (sec_dis==='0' || (sec_dis !== '0' && dis !== '0')) ? (dis+con) : (sec_dis+dis+con)
                    display.textContent = '0';
                }
            } else if (con==='=') {
                let answer; 
                try {
                    answer = eval(sec_dis+dis);
                } catch {
                    answer = "Error"
                }
                sec_display.textContent = answer;
                display.textContent = '0';
            } else if (con==="<-") {

                if (dis.length < 2) {
                    if (dis==='0') { return; }
                    else { display.textContent = '0'; return; }

                } else {

                    display.textContent = dis.substring(0,dis.length-1);
                    return

                }
            
            } else { // Now for sure, Numbers must be pressed
                display.textContent = (dis === '0') ? con : dis+con;
            }
        });
    });
});