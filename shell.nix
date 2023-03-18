{
    pkgs ? import <nixpkgs> {}
}:
with pkgs; mkShell {
    buildInputs = [
        nodejs-14_x
        nodejs-14_x.pkgs.yarn
        python2 # yep.
    ];
}