$(document).ready(function() {

    // Listener for the form
    $('#form').submit(function(event) {
        event.preventDefault(); 
        if (validateNumber($('#numberInput').val())) {
            getCharacterData($('#numberInput').val());
            displayMain();
            scrollToMain();
        }
    });

    // Listener for the random button
    $('#btn-random').click(function() {
        const randomId = Math.floor(Math.random() * 732) + 1;
        getCharacterData(parseInt(randomId));
        displayMain();
        scrollToMain();
    });

    // Function to display the main and footer
    function displayMain() {
        let mainContainer = $('#main-container, #footer-container');
        mainContainer.css('display', 'block');
    }

    // Function to validate the number
    function validateNumber(number) {
        var parsedNumber = parseInt(number, 10);
        return !isNaN(parsedNumber) && parsedNumber >= 1 && parsedNumber <= 732;
    }

    //Function to animate the scroll to the main
    function scrollToMain() {
        const scrollMain = document.getElementById('main-container');
        scrollMain.scrollIntoView({ behavior: 'smooth' });
    }

    // function to get the character data from the API using ajax
    function getCharacterData(number) {
        $.ajax({
            url: `https://superheroapi.com/api.php/2619421814940190/${number}`,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.response === 'success') {
                       
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
          
                    // Append the templates to the DOM
                    $('.bio').empty();
                    $('#chartContainer').empty();
                    
                    $('.bio').append(bioTemplate);
                    $('#chartContainer').CanvasJSChart(statTemplate);
                }
            }
        });
    }
});
