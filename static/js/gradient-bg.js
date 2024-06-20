
var granimInstance = Granim ? new Granim({
    element: '#gradient_bg',
    direction: 'diagonal',
    isPausedWhenNotInView: true,
    states : {
        "default-state": {
            gradients: [
                ['#FBAD18', '#f4642a'],
                ['#81cbeb', '#f46626'],
                ['#EA9B1C', '#FBAD18']
            ],
            transitionSpeed: 2000
        }
    }
}) : null;