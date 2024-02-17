$(document).ready(function() {
    $('#form').submit(function(event) {
        event.preventDefault(); 

        showMain();
        getCharacterData($('#numberInput').val());

        const scrollMain = document.getElementById('main-container');
        scrollMain.scrollIntoView({ behavior: 'smooth' });
    });

    // Listener for the random button
    $('#btn-random').click(function() {
        let mainContainer = $('#main-container, #footer-container');

        const randomId = Math.floor(Math.random() * 732) + 1;
        getCharacterData(parseInt(randomId));
        mainContainer.css('display', 'block');

        const scrollMain = document.getElementById('main-container');
        scrollMain.scrollIntoView({ behavior: 'smooth' });
    });

    // Function to show the main and footer if the number is valid
    function showMain() {
        let numberInput = $('#numberInput').val(),
            mainContainer = $('#main-container, #footer-container');

        if (validateNumber(numberInput)) {
            mainContainer.css('display', 'block');
        }
    }

    // Function to validate the number
    function validateNumber(number) {
        var parsedNumber = parseInt(number, 10);
        return !isNaN(parsedNumber) && parsedNumber >= 1 && parsedNumber <= 732;
    }

    // Use of ajax to get the data from the API
    function getCharacterData(number) {
        $.ajax({
            url: `https://superheroapi.com/api.php/2619421814940190/${number}`,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.response === 'success') {
                    
                    const bioContainer = $('.bio');
                    const statsContainer = $('#chartContainer');
                    
                    // Template for the bio
                    const bioTemplate = `
                        <article class="bio-content">
                            <h3 class="bio-content__name">${data.name}</h2>
                            <ul class="bio-content__des">
                                <li>
                                    <strong>Conexiones: </strong>${data.connections["group-affiliation"]}
                                </li>
                                <li>
                                    <strong>Publicado por: </strong>${data.biography.publisher}
                                </li>
                                <li>
                                    <strong>Ocupación: </strong>${data.work.occupation}
                                </li>
                                <li>
                                    <strong>Primera Aparición: </strong>${data.biography["first-appearance"]}
                                </li>
                                <li>
                                    <strong>Altura: </strong>${data.appearance.height.join(" - ")}
                                </li>
                                <li>
                                    <strong>Peso: </strong>${data.appearance.weight.join(" - ")}
                                </li>
                                <li>
                                    <strong>Aliases: </strong>${data.biography.aliases}
                                </li>
                            </ul>
                        </article>
                        <article class="bio-img">
                            <img src="${data.image.url}" alt="Hero picture" />
                        </article>
                    `;
                    bioContainer.empty();
                    bioContainer.append(bioTemplate);

                    // Template for the stats
                    const datosXY = [];
                    for (let key in data.powerstats) {
                        datosXY.push({ 
                            label: key,
                            y: parseInt(data.powerstats[key])
                        });
                    }

                    const statTemplate = {
                        title: {
                            text: `ESTADÍSTICAS DE PODER`,
                            fontFamily: "Work Sans",
                            fontSize: "30",
                            fontWeight: "700",
                            fontColor: "rgb(58, 31, 151)",
                            margin: 40,
                        },

                        data: [
                            {
                              type: "pie",
                              startAngle: 45,
                              showInLegend: "true",
                              legendText: "{label}",
                              indexLabel: "{label} ({y})",
                              yValueFormatString: "#,##0.#" % "",
                              dataPoints: datosXY,
                            },
                          ],
                    };

                    statsContainer.empty();
                    statsContainer.CanvasJSChart(statTemplate);

                }
            }
        });
    }

});
