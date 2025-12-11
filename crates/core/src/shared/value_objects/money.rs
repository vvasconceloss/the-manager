use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use std::ops::{Add, Div, Mul, Sub};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub enum Currency {
    EUR,
    GBP,
    USD,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct Money {
    pub amount: Decimal,
    pub currency: Currency,
}

impl Money {
    pub fn new(amount: Decimal, currency: Currency) -> Self {
        Money { amount, currency }
    }

    pub fn zero(currency: Currency) -> Self {
        Money::new(Decimal::ZERO, currency)
    }

    fn assert_currency(&self, other: &Money) {
        assert_eq!(self.currency, other.currency, "Currencies must match");
    }
}

impl Add for Money {
    type Output = Money;

    fn add(self, rhs: Money) -> Money {
        self.assert_currency(&rhs);
        Money::new(self.amount + rhs.amount, self.currency)
    }
}

impl Sub for Money {
    type Output = Money;

    fn sub(self, rhs: Money) -> Money {
        self.assert_currency(&rhs);
        Money::new(self.amount - rhs.amount, self.currency)
    }
}

impl Mul<Decimal> for Money {
    type Output = Money;

    fn mul(self, rhs: Decimal) -> Money {
        Money::new(self.amount * rhs, self.currency)
    }
}

impl Div<Decimal> for Money {
    type Output = Money;

    fn div(self, rhs: Decimal) -> Money {
        Money::new(self.amount / rhs, self.currency)
    }
}
