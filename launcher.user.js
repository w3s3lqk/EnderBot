var aposLauncherVersion = 4.0;

var sha = "efde0488cc2cc176db48dd23b28a20b90314352b";

function getLatestCommit() {
    window.jQuery.ajax({
        url: "https://api.github.com/repos/Enderbel/EnderBot/git/refs/heads/master",
        cache: false,
        dataType: "jsonp"
    }).done(function(data) {
        console.dir(data.data);
        console.log("hmm: " + data.data.object.sha);
        sha = data.data.object.sha;

        function update(prefix, name, url) {
            window.jQuery(document.body).prepend("<div id='" + prefix + "Dialog' style='position: absolute; left: 0px; right: 0px; top: 0px; bottom: 0px; z-index: 100; display: none;'>");
            window.jQuery('#' + prefix + 'Dialog').append("<div id='" + prefix + "Message' style='width: 350px; background-color: #FFFFFF; margin: 100px auto; border-radius: 15px; padding: 5px 15px 5px 15px;'>");
            window.jQuery('#' + prefix + 'Message').append("<h2>UPDATE TIME!!!</h2>");
            window.jQuery('#' + prefix + 'Message').append("<p>Grab the update for: <a id='" + prefix + "Link' href='" + url + "' target=\"_blank\">" + name + "</a></p>");
            window.jQuery('#' + prefix + 'Link').on('click', function() {
                window.jQuery("#" + prefix + "Dialog").hide();
                window.jQuery("#" + prefix + "Dialog").remove();
            });
            window.jQuery("#" + prefix + "Dialog").show();
        }

        window.jQuery.get('https://raw.githubusercontent.com/Enderbel/EnderBot/master/launcher.user.js?' + Math.floor((Math.random() * 1000000) + 1), function(data) {
            var latestVersion = data.replace(/(\r\n|\n|\r)/gm, "");
            latestVersion = latestVersion.substring(latestVersion.indexOf("// @version") + 11, latestVersion.indexOf("// @grant"));

            latestVersion = parseFloat(latestVersion + 0.0000);
            var myVersion = parseFloat(aposLauncherVersion + 0.0000);

            if (latestVersion > myVersion) {
                update("aposLauncher", "launcher.user.js", "https://github.com/Enderbel/EnderBot/blob/" + sha + "/launcher.user.js/");
            }
            console.log('Current launcher.user.js Version: ' + myVersion + " on Github: " + latestVersion);
        });

    }).fail(function() {});
}
getLatestCommit();
