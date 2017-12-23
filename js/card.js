function Card(description) {
	var self = this;

	this.id = randomString();
	this.description = description;
	this.$element = createCard();

	function createCard() {
		var $card = $('<li>').addClass('card');
		var $cardDescription = $('<p>').addClass('card-description').text(self.description);
		var $cardDelete = $('<button>').addClass('btn-delete').text('x');

		$cardDelete.on('click', function() {
			self.removeCard();
		});

		$card.append($cardDelete)
			.append($cardDescription);

		return $card;
	}
}

Card.prototype = {
	removeCard: function() {
		this.$element.remove();
	}
}