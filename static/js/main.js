 window.onload = function() {
            const selects = [
                document.getElementById('skI'),
                document.getElementById('skII'),
                document.getElementById('skIII')
            ];

            selects.forEach(select => {
                select.innerHTML = '';
                for (let i = 0; i <= 10; i++) {
                    const value = i * 10 + "%";
                    const option = document.createElement('option');
                    option.value = value;
                    option.textContent = value;
                    select.appendChild(option);
                }
            });

            calculateResources();
        };

        function calculateResources() {
            const skI = parseInt(document.getElementById('skI').value) || 0;
            const skII = parseInt(document.getElementById('skII').value) || 0;
            const skIII = parseInt(document.getElementById('skIII').value) || 0;

            const resources = {
                RTW: 0,
                KTW: 0,
                NEF: 0
            };

            // SK I
            resources.NEF += skI / 20;
            resources.RTW += skI / 20;

            // SK II
            resources.RTW += skII / 20;

            // SK III
            resources.KTW += skIII / 40;


            document.getElementById('rtw-result').textContent = Math.ceil(resources.RTW);
            document.getElementById('ktw-result').textContent = Math.ceil(resources.KTW);
            document.getElementById('nef-result').textContent = Math.ceil(resources.NEF);
        }